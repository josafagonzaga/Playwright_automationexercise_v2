import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/account-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { ContactPage } from '../pages/contact-page';
import { HomePage } from '../pages/home-page';
import { LoginSignupPage } from '../pages/login-signup-page';
import { PaymentPage } from '../pages/payment-page';
import { ProductDetailPage } from '../pages/product-detail-page';
import { ProductsPage } from '../pages/products-page';
import { SubscriptionComponent } from '../pages/subscription-component';
import { TestCasesPage } from '../pages/test-cases-page';

type Pages = {
  accountPage: AccountPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactPage: ContactPage;
  homePage: HomePage;
  loginSignupPage: LoginSignupPage;
  paymentPage: PaymentPage;
  productDetailPage: ProductDetailPage;
  productsPage: ProductsPage;
  subscriptionComponent: SubscriptionComponent;
  testCasesPage: TestCasesPage;
};

export const test = base.extend<Pages>({
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginSignupPage: async ({ page }, use) => {
    await use(new LoginSignupPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  subscriptionComponent: async ({ page }, use) => {
    await use(new SubscriptionComponent(page));
  },

  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
});

export { expect } from '@playwright/test';
