"""
Helpers to retrieve SIFTA cooperator data.
"""
import datetime

import requests

from ngwmn import app


def get_cooperators(site_no):
    """
    Gets the cooperator data from the SIFTA service
    :param site_no: USGS site number
    """

    current_date = datetime.datetime.now()
    year = current_date.year

    # Only query for providers active in the current water year which runs from October 1st through September 30th
    end_of_water_year = datetime.datetime(year, 9, 30)
    if end_of_water_year < datetime.datetime.now():
        year = year - 1
    else:
        year = year

    url = app.config['COOPERATOR_SERVICE_PATTERN'].format(site_no=site_no, year=year,
                                                          current_date=current_date)
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as err:
        app.logger.error(str(err))
        return []

    # Gracefully degrade to an empty list of cooperators
    if not response.ok:
        app.logger.debug(
            '%s from %s (reason: %s). Treating as zero cooperators...',
            response.status_code,
            response.url,
            response.reason
        )
        return []

    return response.json().get('Customers', [])
