import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  get errorMessage() {
    return $("div > .text-red-500");
  }
  
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
  
  async verifyErrorMsgText (error,text) {
    console.log(await error.getText(), text);
    await expect(await error.getText()).toEqual(text);
  }
  async clickElement (element) {
    await element.click()
  };
  async verifyAscendingArray(array){
    let ascArray = []
    array.forEach(element => {
      ascArray.push(element)
    }) 
    let new_array = ascArray.sort(function(a, b){return a - b})
    expect(array).toEqual(new_array)
  };
  async verifyDescendingArray(array){
    let ascArray = []
    array.forEach(element => {
      ascArray.push(element)
    }) 
    let new_array = ascArray.sort(function(a, b){return b - a})
    expect(array).toEqual(new_array)
  };
}