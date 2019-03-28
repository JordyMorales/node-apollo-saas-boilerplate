import Stripe from 'stripe';
import {
  createCustomer,
  createCard,
  createSubscription,
  listAllInvoices,
  handleWebhook
} from './stripe';

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = 'MOCK-KEY';
});

it('creates customer and returns a customer id', async () => {
  const id = await createCustomer({
    name: 'John',
    email: 'john@doe.com'
  });
  expect(Stripe.mocks.customers.create).toHaveBeenCalledWith({
    name: 'John',
    email: 'john@doe.com'
  });
  expect(id).toEqual('cust_234');
});

it('updates customer with token', async () => {
  const resp = await createCard({
    token: 'cust_token',
    customerId: 'cust_234'
  });
  expect(Stripe.mocks.customers.update).toHaveBeenCalledWith('cust_234', {
    source: 'cust_token'
  });
  expect(resp).toEqual({
    token: 'tok_234',
    customerId: 'cust_234'
  });
});

it('subscribes customer to a plan', async () => {
  const resp = await createSubscription({
    customerId: 'cust_234',
    planId: 'annual_premium'
  });
  expect(Stripe.mocks.subscriptions.create).toHaveBeenCalledWith({
    customer: 'cust_234',
    items: [{ plan: 'annual_premium' }]
  });
  expect(resp).toEqual({
    planId: 'annual_premium',
    customerId: 'cust_234'
  });
});

it.todo('lists all invoices for a customer');
it.todo('runs callback on customer subscription deleted webhook');
it.todo('runs callback on customer subscription created webhook');
it.todo('runs callback on customer subscription updated webhook');
