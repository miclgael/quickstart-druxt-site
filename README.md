# MG technical evaluation

# Backend config

See [Drupal Backend URL](https://8080-miclgael-quickstartdruxt-b5am05kf8ai.ws-us32.gitpod.io/)

## Install dependencies

```txt
ddev composer require 'drupal/pathauto'
ddev composer require 'drupal/title_field_for_manage_display'
ddev composer require 'drupal/address:^1.10'
```

## Add modules in Drupal Backend

Log-in to Drupal backend at `/admin`

Navigate to `/admin/modules`

1. Check the boxes: Address, Pathauto, Title Field For Manage Display
2. Click Install
3. When prompted, also install the required dependencies (Chaos Tools/Token)

> ✅ _5 modules have been enabled: Address, Pathauto, Title Field For Manage Display, Chaos Tools, Token._

## Add `Event` Type

1. Navigate to `/admin/structure/types`.
2. Click `+ Add content type`, give it the title 'Event'
3. Go to manage fields `/admin/structure/types/manage/event/fields`

<details>
  <summary>Create these Event fields</summary>
  <div>
    Title
      Description 
      Start date 
        Help text: Enter the date the event starts. 
      Start time
        Help text: If there is a fixed start time for your event enter it here. 
      End date
        Help text: If this event runs over multiple days enter the last date here. 
      End time
        Help text: If there is a fixed end time for your event enter it here. 

      Address
        Only expose the following address fields:
        Company
        Street Address (2 lines)
        Suburb
        State
        Postal code

        Default Country Australia, Default state Victoria.

      Contact email

        Help text: Enter the primary contact email address.

      Contact phone

        Help text: Enter the primary contact email address.
  </div>
</details>

## Configure custom slug for Event with pathauto

1. Go to `admin/config/search/path/patterns`
2. Create new Pathauto pattern: `event/[current-date:html_date]-[node:field_display_title]`

## Enter Event Content

[Event slug](https://8080-miclgael-quickstartdruxt-b5am05kf8ai.ws-us32.gitpod.io/event/2022-02-18-rememberance-day-activities)

# Front end Config

See [Nuxt Front-end](https://3000-miclgael-quickstartdruxt-b5am05kf8ai.ws-us32.gitpod.io/)
