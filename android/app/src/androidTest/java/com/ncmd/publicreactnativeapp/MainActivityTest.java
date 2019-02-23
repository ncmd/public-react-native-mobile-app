package com.ncmd.publicreactnativeapp;

import android.support.test.rule.ActivityTestRule;

import android.support.test.espresso.ViewInteraction;
import android.support.test.filters.LargeTest;

import android.view.View;

import org.hamcrest.core.IsInstanceOf;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.scrollTo;
import static android.support.test.espresso.action.ViewActions.typeTextIntoFocusedView;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withContentDescription;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.core.AllOf.allOf;

@LargeTest
@RunWith(JUnit4.class)
public class MainActivityTest {

    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);

    @BeforeClass
    public static void beforeAll() {
        Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
    }

    private String landingsignupId = "landingsignup";
    private String signupbackId = "signupback";
    private String landingloginId = "landinglogin";

    @Test
    public void testTakeMoreScreenshots1() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("01LandingScreen");
        onView(allOf(withContentDescription(landingsignupId), isDisplayed())).perform(click());

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Screengrab.screenshot("02LandingSignup");
        onView(allOf(withContentDescription(signupbackId), isDisplayed())).perform(click());

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Screengrab.screenshot("03LandingLogin");
    }
    }

//    @Test
//    public void testTakeMoreScreenshots3() {
//        try {
//            Thread.sleep(7000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        onView(allOf(withContentDescription(landingloginId), isDisplayed())).perform(click());
//        try {
//            Thread.sleep(7000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        Screengrab.screenshot("03LandingLogin");
//    }

