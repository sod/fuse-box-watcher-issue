## issue reproduction

```bash
npm install
npm start # starts watcher and opens browser on localhost:4444
```

### 1. Change line 8 in `src/component/my-component.vue` from

```typescript
export default {
```

to

```typescript
/export default {
```

you see a syntax error

### 2. Change the line back

 watcher doesn't recover. Error in browser console reads:

```log
Package not found process
```