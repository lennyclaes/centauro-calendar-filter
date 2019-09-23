# Centauro Calendar Filter

CLI to filter out your group in an iCalendar file, because Centauro doesn't let you when exporting the calendar.

## Requirements

NodeJS (version 10 or higher) must be installed.
You can download it from [this website](https://nodejs.org/en/ "NodeJS webiste").

## Usage

### 1. Download the iCalendar file
You can do this by opening the link in the export tab.

### 2. Clone this repository

```bash
git clone https://github.com/lennyclaes/centauro-calendar-filter.git
cd centauro-calendar-filter
```

### 3. Run the program
This program is only available as a CLI at the moment. There will be a website for easy access in the future.

```bash
node app.js [path to ical/ics file] [path to output new file] [your group number]
```

### 4. Import the file in your calendar app of choice

You can now import the file in any calendar app that supports the iCalendar format. You will need to look this up for your app of choice.

## Contact

With any problems or questions, you can always contact me by mail. [lenny@lennyclaes.be](mailto:lenny@lennyclaes.be?SUBJECT=centauro-calendar-filter) (Dutch and English)