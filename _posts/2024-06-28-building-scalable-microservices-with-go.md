---
layout: post
title: "Building Scalable Microservices with Go: Lessons from Production"
date: 2024-06-28 10:00:00 -0000
category: tech
tags: [go, microservices, architecture, backend, scalability]
excerpt: "Discover practical patterns and anti-patterns for building microservices in Go, based on real-world production experience with high-traffic systems."
read_time: 8
---

Over the past two years, I've been working on a distributed system that processes over 10 million requests per day using Go microservices. Here are the key lessons I've learned about building scalable, maintainable services that can handle production traffic.

## Why Go for Microservices?

Go's lightweight goroutines, built-in concurrency primitives, and excellent standard library make it an ideal choice for microservices architecture. The language's simplicity and fast compilation times also contribute to developer productivity.

```go
// Example: Simple HTTP service with graceful shutdown
package main

import (
    "context"
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", healthHandler)
    mux.HandleFunc("/api/users", usersHandler)
    
    server := &http.Server{
        Addr:    ":8080",
        Handler: mux,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 15 * time.Second,
        IdleTimeout:  60 * time.Second,
    }
    
    // Start server in a goroutine
    go func() {
        if err := server.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal("Server failed to start:", err)
        }
    }()
    
    // Graceful shutdown
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    if err := server.Shutdown(ctx); err != nil {
        log.Fatal("Server forced to shutdown:", err)
    }
}
```

## Essential Patterns for Production

### 1. Circuit Breaker Pattern

One of the most critical patterns for microservices is the circuit breaker. It prevents cascading failures by temporarily stopping calls to a failing service.

```go
type CircuitBreaker struct {
    maxFailures int
    resetTime   time.Duration
    failures    int
    lastFailure time.Time
    state       string // "closed", "open", "half-open"
    mutex       sync.RWMutex
}

func (cb *CircuitBreaker) Call(fn func() error) error {
    cb.mutex.RLock()
    state := cb.state
    failures := cb.failures
    lastFailure := cb.lastFailure
    cb.mutex.RUnlock()
    
    if state == "open" {
        if time.Since(lastFailure) > cb.resetTime {
            cb.mutex.Lock()
            cb.state = "half-open"
            cb.mutex.Unlock()
        } else {
            return fmt.Errorf("circuit breaker is open")
        }
    }
    
    err := fn()
    
    cb.mutex.Lock()
    defer cb.mutex.Unlock()
    
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.maxFailures {
            cb.state = "open"
        }
    } else {
        cb.failures = 0
        cb.state = "closed"
    }
    
    return err
}
```

### 2. Structured Logging

Consistent, structured logging is crucial for debugging distributed systems. I recommend using a library like `logrus` or `zap`.

```go
import "github.com/sirupsen/logrus"

func processRequest(userID string, requestID string) {
    logger := logrus.WithFields(logrus.Fields{
        "user_id":    userID,
        "request_id": requestID,
        "service":    "user-service",
    })
    
    logger.Info("Processing user request")
    
    // Process request...
    
    logger.WithField("duration", "150ms").Info("Request completed")
}
```

### 3. Database Connection Pooling

Proper database connection management is essential for scalability:

```go
import (
    "database/sql"
    "time"
    _ "github.com/lib/pq"
)

func setupDB() (*sql.DB, error) {
    db, err := sql.Open("postgres", connectionString)
    if err != nil {
        return nil, err
    }
    
    // Configure connection pool
    db.SetMaxOpenConns(25)                 // Maximum open connections
    db.SetMaxIdleConns(5)                  // Maximum idle connections
    db.SetConnMaxLifetime(5 * time.Minute) // Connection lifetime
    
    return db, nil
}
```

## Performance Optimization Tips

### 1. Use Context for Request Tracing

Always pass context through your call chain for proper request tracing and cancellation:

```go
func getUserProfile(ctx context.Context, userID string) (*User, error) {
    // Check if request was cancelled
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }
    
    // Make database call with context
    return db.GetUserWithContext(ctx, userID)
}
```

### 2. Implement Proper Metrics

Use Prometheus metrics to monitor your services:

```go
import "github.com/prometheus/client_golang/prometheus"

var (
    requestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "http_request_duration_seconds",
            Help: "HTTP request duration in seconds",
        },
        []string{"method", "endpoint", "status"},
    )
)

func metricsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        
        next.ServeHTTP(w, r)
        
        duration := time.Since(start).Seconds()
        requestDuration.WithLabelValues(
            r.Method,
            r.URL.Path,
            fmt.Sprintf("%d", http.StatusOK),
        ).Observe(duration)
    })
}
```

## Common Anti-Patterns to Avoid

1. **Synchronous communication everywhere**: Use async messaging where appropriate
2. **Shared databases**: Each service should own its data
3. **Missing timeouts**: Always set timeouts for external calls
4. **No health checks**: Implement proper health check endpoints
5. **Ignoring graceful shutdowns**: Always handle SIGTERM properly

## Deployment and Monitoring

For production deployments, consider:

- **Container orchestration** with Kubernetes
- **Service mesh** like Istio for traffic management
- **Distributed tracing** with Jaeger or Zipkin
- **Centralized logging** with ELK stack
- **Alerting** based on SLIs/SLOs

## Conclusion

Building scalable microservices in Go requires careful attention to patterns, monitoring, and operational concerns. The language's strengths in concurrency and simplicity make it an excellent choice, but success depends on implementing the right architectural patterns and having proper observability in place.

Remember that microservices architecture comes with its own complexity. Start simple, measure everything, and evolve your architecture based on actual needs rather than theoretical scalability requirements.

---

*Have you worked with Go microservices in production? I'd love to hear about your experiences and any patterns you've found effective. Feel free to reach out via the [contact page](/contact/).*