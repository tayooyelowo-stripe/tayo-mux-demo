### Run instructions
> Create a backend/.env file and include your STRIPE_SECRET_KEY. i.e. STRIPE_SECRET_KEY={key_from_stripe_dash}
> stripe listen --forward-to localhost:3000/webhook
> # copy the webhook signing secret and paste in the backend/.env file as STRIPE_WEBHOOK_SIGNING_SECRET={copied_key}
> cd backend && yarn dev
> cd frontend && yarn dev