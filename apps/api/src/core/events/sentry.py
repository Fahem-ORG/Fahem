from fastapi import FastAPI

import sentry_sdk

from config.config import FahemLmsConfig 

async def init_sentry(app: FastAPI) -> None:
    
    fahem_config : FahemLmsConfig = app.fahem_config # type: ignore 
    if fahem_config.hosting_config.sentry_config is not None:
        sentry_sdk.init(
        dsn=app.fahem_config.hosting_config.sentry_config.dsn, # type: ignore
        environment=app.fahem_config.hosting_config.sentry_config.environment, # type: ignore
        release=app.fahem_config.hosting_config.sentry_config.release, # type: ignore
        traces_sample_rate=1.0,
    )
