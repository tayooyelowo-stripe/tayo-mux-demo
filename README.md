## Run instructions
1. Create a Create a backend/.env file and include your STRIPE_SECRET_KEY. i.e. STRIPE_SECRET_KEY={key_from_stripe_dash}
2. Run the following command `stripe listen --forward-to localhost:3000/webhook`
3. copy the webhook signing secret and paste in the backend/.env file as STRIPE_WEBHOOK_SIGNING_SECRET={copied_key}
4. In another terminal run `cd backend && yarn dev`
5. In another terminal run `cd frontend && yarn dev`