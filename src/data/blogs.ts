export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  categories: string[];
  tags: string[];
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kubernetes-deployment-best-practices",
    title: "Kubernetes Deployment Best Practices for Production",
    excerpt:
      "Learn how to deploy applications on Kubernetes with zero downtime, proper resource management, and automated rollbacks.",
    content: `# Kubernetes Deployment Best Practices for Production

Kubernetes has become the de facto standard for container orchestration, but deploying applications effectively requires understanding several key practices.

## Resource Management

Proper resource requests and limits are crucial for stable deployments. Always set both CPU and memory requests to help the scheduler place pods correctly, and set limits to prevent resource contention.

\`\`\`yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
\`\`\`

## Health Checks

Implementing robust health checks ensures Kubernetes can detect and recover from failures automatically. Use both liveness and readiness probes:

- **Liveness probes** restart containers that are stuck or unresponsive
- **Readiness probes** prevent traffic from reaching pods that aren't ready

## Rolling Updates

Configure rolling update strategies to minimize downtime:

\`\`\`yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
\`\`\`

This ensures at least one pod is always available during updates.

## Secrets Management

Never hardcode credentials. Use Kubernetes Secrets or external secret management systems like HashiCorp Vault. Mount secrets as volumes or environment variables, and rotate them regularly.

## Monitoring and Observability

Deploy comprehensive monitoring with Prometheus and Grafana. Set up alerts for critical metrics like CPU usage, memory pressure, and pod restarts. Use distributed tracing to debug issues across microservices.

## Conclusion

Following these practices will help you build resilient, scalable Kubernetes deployments that can handle production workloads effectively.`,
    date: "2024-01-15",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    categories: ["DevOps", "Kubernetes"],
    tags: ["kubernetes", "deployment", "containers", "production"],
  },
  {
    slug: "ci-cd-pipeline-optimization",
    title: "Optimizing CI/CD Pipelines for Faster Releases",
    excerpt:
      "Discover strategies to reduce build times, improve test coverage, and accelerate your deployment cycles.",
    content: `# Optimizing CI/CD Pipelines for Faster Releases

Modern software development demands rapid iteration, and your CI/CD pipeline is often the bottleneck. Here's how to optimize it.

## Parallel Execution

Run independent jobs in parallel to reduce total pipeline time. Use matrix builds for testing across multiple environments or versions simultaneously.

## Caching Strategies

Implement intelligent caching for dependencies:

- Cache package manager artifacts (npm, pip, Maven)
- Cache Docker layers
- Cache build artifacts between jobs

Most CI platforms support caching mechanisms that can cut build times by 50% or more.

## Test Optimization

Prioritize fast tests first:

1. **Unit tests** - Run immediately, fail fast
2. **Integration tests** - Run in parallel
3. **E2E tests** - Run only on main branch or schedule separately

Use test result caching to skip unchanged tests.

## Incremental Builds

Only build what changed. Use tools like Turborepo or Nx for monorepos to identify and build only affected packages.

## Docker Layer Optimization

Structure Dockerfiles to maximize layer caching:

\`\`\`dockerfile
# Install dependencies first (changes less frequently)
COPY package.json .
RUN npm install

# Copy source code last (changes frequently)
COPY . .
RUN npm run build
\`\`\`

## Conclusion

With these optimizations, teams often see 60-80% reduction in pipeline execution time, enabling multiple deployments per day.`,
    date: "2024-01-22",
    author: {
      name: "Marcus Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    categories: ["CI/CD", "DevOps"],
    tags: ["ci-cd", "automation", "testing", "performance"],
  },
  {
    slug: "microservices-architecture-patterns",
    title: "Microservices Architecture Patterns and Anti-patterns",
    excerpt:
      "Explore common patterns for building scalable microservices and learn what pitfalls to avoid.",
    content: `# Microservices Architecture Patterns and Anti-patterns

Microservices offer flexibility and scalability, but they also introduce complexity. Understanding patterns and anti-patterns is essential.

## Essential Patterns

### API Gateway

A single entry point for all client requests. The API Gateway handles routing, authentication, rate limiting, and request aggregation.

### Service Discovery

Services need to find each other dynamically. Use service discovery mechanisms like Consul, Eureka, or Kubernetes DNS.

### Circuit Breaker

Prevent cascading failures by breaking the circuit when a service is down:

\`\`\`javascript
if (failureCount > threshold) {
  return cachedResponse || errorResponse;
}
\`\`\`

### Saga Pattern

Manage distributed transactions across services using orchestration or choreography patterns.

## Anti-patterns to Avoid

### Distributed Monolith

Services are too tightly coupled, sharing databases or requiring synchronous communication. This defeats the purpose of microservices.

### Database per Service Violation

Multiple services accessing the same database creates tight coupling. Each service should own its data.

### Over-Engineering

Not every application needs microservices. Start with a monolith and extract services when you have clear boundaries.

## When to Use Microservices

Consider microservices when:
- Teams are large and need independence
- Different services have different scaling requirements
- You need technology diversity
- Services have clear business boundaries

## Conclusion

Microservices are powerful but require discipline. Follow proven patterns and avoid common pitfalls to build maintainable systems.`,
    date: "2024-02-05",
    author: {
      name: "Emily Watson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    categories: ["Architecture", "Microservices"],
    tags: ["microservices", "architecture", "patterns", "distributed-systems"],
  },
  {
    slug: "docker-security-hardening",
    title: "Docker Security Hardening Guide",
    excerpt:
      "Essential security practices for running Docker containers in production environments.",
    content: `# Docker Security Hardening Guide

Container security is critical for production deployments. Here's a comprehensive guide to hardening your Docker setup.

## Use Non-Root Users

Never run containers as root. Create and use non-privileged users:

\`\`\`dockerfile
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
\`\`\`

## Scan Images for Vulnerabilities

Regularly scan images for known vulnerabilities using tools like:
- Trivy
- Clair
- Docker Scout

Integrate scanning into your CI/CD pipeline.

## Minimal Base Images

Use minimal base images like Alpine Linux or distroless images. Smaller images have fewer attack surfaces.

## Secrets Management

Never embed secrets in images or environment variables visible in \`docker inspect\`. Use:
- Docker secrets (Swarm mode)
- External secret managers
- Encrypted environment variables

## Network Security

Isolate containers using Docker networks:

\`\`\`bash
docker network create --driver bridge isolated-network
\`\`\`

Only expose necessary ports and use firewall rules.

## Resource Limits

Set resource limits to prevent resource exhaustion attacks:

\`\`\`yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
\`\`\`

## Regular Updates

Keep Docker and base images updated. Subscribe to security advisories and patch promptly.

## Conclusion

Security is an ongoing process. Regular audits, updates, and following these practices will significantly reduce your attack surface.`,
    date: "2024-02-12",
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    categories: ["Security", "Docker"],
    tags: ["docker", "security", "containers", "hardening"],
  },
  {
    slug: "terraform-infrastructure-as-code",
    title: "Terraform Best Practices for Infrastructure as Code",
    excerpt:
      "Learn how to structure Terraform projects, manage state, and write maintainable infrastructure code.",
    content: `# Terraform Best Practices for Infrastructure as Code

Terraform enables infrastructure as code, but writing maintainable Terraform requires following best practices.

## Project Structure

Organize Terraform code logically:

\`\`\`
terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── ec2/
│   └── rds/
└── shared/
\`\`\`

## State Management

Use remote state backends (S3, Terraform Cloud) to enable team collaboration:

\`\`\`hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}
\`\`\`

## Use Modules

Create reusable modules for common infrastructure patterns:

\`\`\`hcl
module "vpc" {
  source = "./modules/vpc"
  
  name       = var.vpc_name
  cidr_block = "10.0.0.0/16"
}
\`\`\`

## Variable Validation

Validate inputs to catch errors early:

\`\`\`hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  
  validation {
    condition     = contains(["t3.micro", "t3.small", "t3.medium"], var.instance_type)
    error_message = "Instance type must be t3.micro, t3.small, or t3.medium."
  }
}
\`\`\`

## Workspaces

Use workspaces for environment separation instead of copying code:

\`\`\`bash
terraform workspace new dev
terraform workspace select dev
terraform apply
\`\`\`

## Conclusion

Following these practices makes Terraform code more maintainable, testable, and less error-prone.`,
    date: "2024-02-20",
    author: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    categories: ["Infrastructure", "Terraform"],
    tags: ["terraform", "iac", "infrastructure", "automation"],
  },
  {
    slug: "monitoring-observability-setup",
    title: "Setting Up Monitoring and Observability",
    excerpt:
      "A practical guide to implementing comprehensive monitoring, logging, and tracing in your applications.",
    content: `# Setting Up Monitoring and Observability

Observability is crucial for understanding system behavior and debugging issues in production.

## The Three Pillars

### Metrics

Collect quantitative data about system performance:
- **Prometheus** for metrics collection
- **Grafana** for visualization
- Key metrics: CPU, memory, request rate, error rate, latency

### Logs

Centralized logging with structured formats:

\`\`\`json
{
  "timestamp": "2024-02-20T10:30:00Z",
  "level": "error",
  "service": "api",
  "message": "Database connection failed",
  "error": "connection timeout"
}
\`\`\`

Use tools like ELK Stack, Loki, or CloudWatch.

### Traces

Distributed tracing shows request flow across services:
- **Jaeger** or **Zipkin** for tracing
- **OpenTelemetry** for instrumentation

## Alerting Strategy

Set up alerts for:
- Error rates exceeding thresholds
- Latency p95/p99 spikes
- Resource exhaustion
- Service unavailability

Use alerting tools like PagerDuty, Opsgenie, or Alertmanager.

## Dashboards

Create dashboards for:
- Service health overview
- Business metrics
- Infrastructure utilization
- Error analysis

## Best Practices

1. **Start small** - Monitor critical paths first
2. **Use sampling** - Don't trace every request
3. **Set SLOs** - Define service level objectives
4. **Review regularly** - Tune alerts to reduce noise

## Conclusion

A well-instrumented system provides visibility into issues before they impact users. Invest in observability early.`,
    date: "2024-02-28",
    author: {
      name: "Jessica Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
    categories: ["Monitoring", "Observability"],
    tags: ["monitoring", "observability", "logging", "metrics"],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false;
      return (
        post.categories.some((cat) => current.categories.includes(cat)) ||
        post.tags.some((tag) => current.tags.includes(tag))
      );
    })
    .slice(0, limit);
}

