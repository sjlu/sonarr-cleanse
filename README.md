# sonarr-cleanse

This small Node.js application will help you maintain a small disk footprint of episodes that are collected by Sonarr.
This is especially useful if you have very limited space and you keep up with your TV shows.

By default, this script will remove any episode that has aired older than a month and has at least been on the filesystem
for at least a week. This will take care of cases such as:

* Any specific episode you requested manually that's aired longer than a month will be removed in a week.
* Any episodes watched for a season will be removed in a week.

## Install

1. Make sure you have Node.js installed onto your machine.

  ```
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

  * This is an example for Ubuntu, more instructions here: https://nodejs.org/en/download/package-manager/

2. With the same unix user that you have Sonarr running on, clone this repository to the home folder of that user and install
   the dependencies

  ```
  git clone git@github.com:sjlu/sonarr-cleanse.git
  cd sonarr-cleanse
  npm install
  ```
  
3. Add a `.env` file into the project's directory, add the following lines into it according to your Sonarr setup.

  ```
  SONAR_API_URL=http://localhost:8989
  SONAR_API_KEY=abcdefghijklmnopqr123
  ```
  
4. Add the following to your `crontab -e`

  ```
  5 4 * * * node sonarr-cleanse/index.js
  ```
  
