const fs = require("fs")
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const credentials = require("./config/credentials.json")
const answers = require("./config/answers.json");
const { error } = require("console");
const url = require("./utils/urlBuilder").url

const driver = new Builder().forBrowser("chrome").build()
driver.manage().window().maximize()

let internships = [];
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await driver.get("https://internshala.com")
  
  let res =await driver.findElement(By.className("login-cta"))
  await res.click()
  let email =await driver.findElement(By.name("email"))
  await email.sendKeys(credentials.email)
  let pwd = await driver.findElement(By.name("password"))
  await pwd.sendKeys(credentials.password)
  
  res=await driver.findElement(By.id("modal_login_submit"))
  let k=await res.click()
  let successful=0
  while(successful===0)
  {
  try{
    console.log("masculine")
    await delay(2000)
      
    let r = await driver.wait(
      until.elementLocated(By.css('a.btn.btn-primary.modal_primary_btn.close_action')),
      20000
    );


    await r.click()
    res=await driver.findElement(By.id("modal_login_submit"))
  let k=await res.click()
  successful=0
  }
  catch{
    successful=1
  }
}


  console.log("done")
  await delay(2000)
  res=await driver.findElement(By.id("jobs_new_superscript"))
  await res.click()
  for(let i=0;i<10000;i++)
  {
    console.log(i)
  }

  const s = await driver.wait(until.elementLocated(By.id('salary_filter')), 10000);
  console.log(s.click)
  await s.click()
  while(1)
  {
  console.log("starting")
  let container =await driver.wait(until.elementLocated(By.id('internship_list_container_1')), 10000);


  // Find all elements within the container that have an id attribute
  let elementsWithIds = await container.findElements(By.xpath('.//*[@id]'));

  // Extract and print all ids
  let ids = [];
  for (let element of elementsWithIds) {
      let id = await element.getAttribute('id');
      if (id.startsWith("individual_internship_")) {
        ids.push(id);
      }
      
  }
  console.log(ids[0])
  res=await driver.findElement(By.id(ids[0]))

  
  let m =await res.click()
  
  res=await driver.wait(until.elementLocated(By.id('continue_button')), 10000);
  
  await res.click()
  await delay(2000)
  try{
    let textarea =await driver.findElement(By.className("ql-editor ql-blank"))
    await textarea.sendKeys('I want this job');
  }
  catch(error)
  {
    console.log(error)
  }

  try{
    let textarea =await driver.findElement(By.id("text_5648225"))
    await textarea.sendKeys('I am a very skilled person and i Like to come up wiht interesting approach to solve a problem for example this application is send using my Automation code.');
  }
  catch(error)
  {
    console.log(error)
  }
  
  
  await delay(2000)
  res=await driver.wait(until.elementLocated(By.id('submit')), 10000);
  await res.click()
  await delay(4000)
  res=await driver.wait(until.elementLocated(By.id('backToInternshipsCta')), 10000);
  await res.click()
  console.log("Ending")
}

})();

    