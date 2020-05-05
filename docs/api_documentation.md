---
id: api_documentation
title: API Specification
---

The API is running in the Edison Space on the SAP Cloud Platform and can called at the following domain:
```
{DOMAIN} = https://climatehero-server-terrific-bandicoot.cfapps.sap.hana.ondemand.com
```

## User Data

#### Get information about the currently authenticated user
Only accessible for: Authorized user
```
GET "{DOMAIN}/user"
```

## Activities

#### Get activity by ID
Only accessible for: Authorized user
```
GET "{DOMAIN}/activities/id={id}"
```
#### List all activities of user
Only accessible for: Authorized user
```
GET "{DOMAIN}/activities/user"
```

#### List activity history of user by USER_ID
Only accessible for: Authorized user

```
GET "{DOMAIN}/activities/historic/user"
```

#### List all activities
Only accessible for: Administrators
```
GET "{DOMAIN}/activities"
```

#### Reset all activities
Only accessible for: Administrators
```
POST "{DOMAIN}/activities/reset"
```

#### Create activities
Only accessible for: Authorized user
```
POST "{DOMAIN}/activities"
```
Required format of the request body:
```
{
    "userId":               [STRING]    e.g.    "test_user_2",
    "type":                 [STRING]    e.g.    "COMMUTE_BIKE",
    "metric":               [STRING]    e.g.    "KM", 
    "measurement":          [DOUBLE]    e.g.    25,
    "dateTimeOfActivity":   [STRING]    e.g.    "13/03/2020 12:13:22"
}
```

#### Edit activity by ID
Only accessible for: Authorized user
```
POST "{DOMAIN}/activities/edit/id={id}"
```
Required format of the request body:
```
{
    "userId":               [STRING]    e.g.    "test_user_2",
    "type":                 [STRING]    e.g.    "COMMUTE_BIKE",
    "metric":               [STRING]    e.g.    "KM", 
    "measurement":          [DOUBLE]    e.g.    25,
    "dateTimeOfActivity":   [STRING]    e.g.    "13/03/2020 12:13:22"
}
```

#### Delete activity by ID
Only accessible for: Authorized user
```
POST "{DOMAIN}/activities/delete/id={id}"
```

## Series of Activities

#### Get series by ID
Only accessible for: Authorized user
```
GET "{DOMAIN}/series/id={id}"
```

#### List all series of user by USER_ID
Only accessible for: Authorized user
```
GET "{DOMAIN}/series/user={user_id}"
```

#### List all series
Only accessible for: Administrators
```
GET "{DOMAIN}/series"
```

#### Reset all series
Only accessible for: Administrators
```
POST "{DOMAIN}/series/reset"
```

#### Create series
Only accessible for: Authorized user
```
POST "{DOMAIN}/series"
```
Required format of the request body:
```
{
    "userId":               [STRING]    e.g.    "test_user_2",
    "activityType":         [STRING]    e.g.     "COMMUTE_BIKE",
    "activityMetric":       [STRING]    e.g.     "KM",
    "activityMeasurement":  [DOUBLE]    e.g.     10,
    "seriesFirstDate":      [STRING]    e.g.     "13/02/2020",
    "seriesLastDate":       [STRING]    e.g.     "19/03/2020",
    "seriesCycle":          [STRING]    e.g.     "EVERY_WEEKDAY / WEEKLY / MONTHLY"
}

```

#### Stop Series by ID
Only accessible for: Authorized user
Stops a series at a specified date: The provided date is the new "seriesLastDay" of the series.
```
POST "{DOMAIN}/series/stop/id={id}&date={date}"
```
Required format of the date:
```
{date} = DDMMYYYY, i.e. {date} = 05032020
```

#### Extend Series by ID
Only accessible for: Authorized user
Extend a series to a specified date: The provided date is the new "seriesLastDay" of the series.

```
POST "{DOMAIN}/series/extend/id={id}&date={date}"
```
Required format of the date:
```
{date} = DDMMYYYY, i.e. {date} = 05032020
```

#### Edit Activity Data of Series by ID
Only accessible for: Authorized user
This call can be used to apply changes of the Activity Data of the series to all corresponding activities (i.e. Type, Measurement and Metric). Any other field that is different from the original Series will not be changed.
```
POST "{DOMAIN}/series/edit-activities/id={id}"
```
Required format of the request body:
```
{
    "userId":               [STRING]    e.g.    "test_user_2",
    "activityType":         [STRING]    e.g.     "COMMUTE_BIKE",
    "activityMetric":       [STRING]    e.g.     "KM",
    "activityMeasurement":  [DOUBLE]    e.g.     10,
    "seriesFirstDate":      [STRING]    e.g.     "13/02/2020",
    "seriesLastDate":       [STRING]    e.g.     "19/03/2020",
    "seriesCycle":          [STRING]    e.g.     "EVERY_WEEKDAY / WEEKLY / MONTHLY"
}

```

#### Delete series by ID
Only accessible for: Authorized user
```
POST "{DOMAIN}/series/delete/id={id}"
```

## Goals
#### Get goal by ID
Only accessible for: Authorized user
```
GET "{DOMAIN}/goals/id={id}"
```

#### List all goals of user by USER_ID
Only accessible for: Authorized user
```
GET "{DOMAIN}/goals/user={user_id}"
```

#### List all goals
Only accessible for: Administrators
```
GET "{DOMAIN}/goals"
```

#### Reset all goals
Only accessible for: Administrators
```
POST "{DOMAIN}/goals/reset"
```

#### Create goals
Only accessible for: Authorized user
```
POST "{DOMAIN}/goals"
```
Required format of the request body:
```
{
    "title":        [STRING]    e.g.   "Commute 100km by bike in March",
    "userId":       [STRING]    e.g.   "test_user_2",
    "type":         [STRING]    e.g.   "COMMUTE_BIKE",
    "metric":       [STRING]    e.g.   "KM",
    "measurement":  [DOUBLE]    e.g.   100,
    "dateStart":    [STRING]    e.g.   "01/03/2020",
    "dateTarget":   [STRING]    e.g.   "31/03/2020"
}
```

#### Edit goal by ID
Only accessible for: Authorized user
```
POST "{DOMAIN}/goals/edit/id={id}"
```
Required format of the request body:
```
{
    "title":        [STRING]    e.g.   "Commute 100km by bike in March",
    "userId":       [STRING]    e.g.   "test_user_2",
    "type":         [STRING]    e.g.   "COMMUTE_BIKE",
    "metric":       [STRING]    e.g.   "KM",
    "measurement":  [DOUBLE]    e.g.   100,
    "dateStart":    [STRING]    e.g.   "01/03/2020",
    "dateTarget":   [STRING]    e.g.   "31/03/2020"
}
```

#### Delete goal by ID
Only accessible for: Authorized user
```
POST "{DOMAIN}/goals/delete/id={id}"
```