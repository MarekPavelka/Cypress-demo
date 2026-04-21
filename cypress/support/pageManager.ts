import { LoginPage } from '../pages/login.page';
import { HeaderPage } from '../pages/header.page';
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

class PageManager {
  private readonly loginPage: LoginPage;
  private readonly headerPage: HeaderPage;
  private readonly homePage: HomePage;
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;

  constructor() {
    this.loginPage = new LoginPage();
    this.headerPage = new HeaderPage();
    this.homePage = new HomePage();
    this.cartPage = new CartPage();
    this.checkoutPage = new CheckoutPage();
  }

  getLoginPage() {
    return this.loginPage;
  }

  getHeaderPage() {
    return this.headerPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }
}

export const pom = new PageManager();
