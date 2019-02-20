//
//  publicreactnativeappUITests.swift
//  publicreactnativeappUITests
//
//  Created by Charles Chong on 2/19/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import XCTest

class publicreactnativeappUITests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.

        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() {
      let app = XCUIApplication()
      snapshot("01LandingScreen")
      sleep(3)
      app.buttons["landingsignup"].tap()
      sleep(3)
      snapshot("02landingsignup")
      app.buttons["signupback"].tap()
      sleep(3)
      app.buttons["landinglogin"].tap()
      snapshot("03landinglogin")
    }

}
