# Copilot Instructions (Project)

## Deploy policy (mandatory)

For any change request that includes deploy, always deploy to both Vercel projects below in both environments:

1. `testesitezin-app` (Preview + Production)
2. `SRFV-REDUX` (Preview + Production)

### Preferred command

```bash
npm run deploy:vercel:both
```

### Fast path (when build already validated)

```bash
npm run deploy:vercel:both:skip-build
```
