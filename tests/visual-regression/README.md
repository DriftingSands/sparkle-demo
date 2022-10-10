
How to test:

```sh
# Make sure you have all dependencies installed
npm i

# Then, run a test by directly calling this the cli
./node_modules/.bin/backstop test --config=local.test.config.js

# If you wish to update the reference images with the screenshots created by the last test run this
./node_modules/.bin/backstop approve --config=local.test.config.js
```