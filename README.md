# LapBear ʕ •ᴥ•ʔ

## The Vision :checkered_flag:
LapBear is a work in progress and still at its very earliest stages, but here is a layout of what LapBear is aiming to become :stars:

LapBear is a device which connects to various inputs on your go kart and gathers all their data in one convenient place. 

### Device Compatibility :electric_plug:
Connect LapBear to your:
* **Transponder**, to track your lap times
* **GPS**, to monitor your location around the track and calculate the track layout
* **GoPro**, to make uploading race videos a breeze
* **Wheel**, to receive detailed information on how you turned the wheel throughout a race
* **Pedals**, to receive detailed data about braking and acceleration throughout a race
* **Shifter**, to receive detailed data about how you changed gears throughout a race

Once the race is over, all of your data will be waiting for you on the LapBear website! Simply sign in to your LapBear account to view your race data, upload your GoPro footage to YouTube, share your data on social media, upload photos from the race, and more!

### StratBear :chart_with_upwards_trend:
LapBear can even help you improve your racing strategy and lap times!

Data Analysis Capabilities
* **Track Layout and Your Racing Lines:** LapBear can use the data gathered from your GPS and/or wheel and pedal inputs to generate an image of the track layout, as well as the racing line you followed in each lap
* **Apexes:** LapBear will use your best lap times to calculate its approximation of where the apexes are in each turn.
* **Optimal Line:** LapBear can reference your best lap times, as well as its calculated track layout, to approximate the best racing line.
* **Elegant Data Displays:** All of the data that LapBear gathered from your race will be viewable in beautiful graphs and text displays. You can view a graph of your braking and acceleration throughout the race, or lap by lap. You can view a text list of your times in each lap, or as a graph. You can even view LapBear's analysis of whether you're hitting each apex in the track-- for any apex you missed, LapBear will tell you if you hit it too early or too late, and whether you went into the corner too fast or too slow. You can personalize LapBear to show the data in whichever way you prefer, and customize your homescreen to only show the information you care about the most.

### Personalization :artist:
LapBear serves as your personal hub for all of your racing data, and offers a wide range of personalization options.

Customization Options
* **Profile:** Create a LapBear profile, view other racer's profiles, and add friends.
* **Race Notes:** For each race, LapBear gives you the option to add a variety of extra info-- where the race took place, what position you finished in, any notes you'd like to add about how the race went, classifying races between practice/qualifying/final, and more. 
* **Social:** LapBear can also function as a social network for racers. Adding friends is just the beginning-- you can tag your friends on races you competed in together, share your results on a variety of social media options, upload your race footage to YouTube with a simple click, search for other LapBear racer profiles at your local track, view your friends' race results in your Friends Feed, comment on your friends' race results, and more. However, if you aren't a fan of all these features, they are completely optional! You can turn off friend requests, make your profile private, disable comments on your race results, etc.

### The Mission :star2:
LapBear is whatever you want to make of it. Completely customizable, you may use only the features that are relevant to you, or use all of them! You don't even need to own a LapBear device to create an account-- users without a LapBear device can still add friends, view their friends' race results, set up a profile, and more.

## Current State :racing_car:
This page will regularly be updated to show what features have been added, are in progress, and are up next.

### Finished Features :white_check_mark:
* Website is up and running, being hosted by Heroku
  * Basic home page
  * Login page
  * Signup page
  * Upload Race Data page
  * 'Page not found' page
* The client can request a LapBear device connection from the server
* The server can gather LapBear device data and return it to the client
  * Basic file I/O-- data gathered from server is stored in a .txt file named after date and time
* **Upload Race Data**
  * Can upload a .txt file with race data
  * Once file is uploaded, contents will be analyzed
  * Generates a plot of wheel data throughout race
  * Generates an estimated track layout (needs further tweaking)
* **Note:** Because the LapBear hardware hasn't been built yet, a Logitech G29 wheel, pedals, and shifter are being used as a substitute until more time/funding can be dedicated to building custom hardware.

### In Progress :thought_balloon:
* Fix estimated track layout
* Add plots for throttle/brake and current gear throughout race
* Integrating with Firebase to support secure user registration and login

### Up Next :pencil2:
* Adding more pages to the site -- homepage upon login, profile page, device connection page, etc
* Fleshing out existing pages
* More & better race data analysis
