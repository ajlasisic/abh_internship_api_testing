import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  
  async waitForDisplayed(el) {
    await el.waitForDisplayed({ timeout: 10000 });
  }

  async waitForExist(el) {
    await el.waitForExist({ timeout: 10000 });
  }

  async waitForText(el, text) {
    await browser.waitUntil(async function () {
      return (await el.getText()) === `${text}`;
    }, { timeout: 10000 });
  }

  async waitForSelected(el) {
    await browser.waitUntil(async function () {
      return (await el.isSelected()) === true;
    }, { timeout: 10000 });
  }
}