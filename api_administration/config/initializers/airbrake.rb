Airbrake.configure do |config|
  config.host = ENV['AIRBRAKE_HOST']
  config.project_id = ENV['AIRBRAKE_PROJECT_ID']
  config.project_key = ENV['AIRBRAKE_PROJECT_KEY']

  # airbrake.io supports various features that are out of scope for
  # Errbit. Disable them:
  config.job_stats           = false
  config.query_stats         = false
  config.performance_stats   = false
  config.remote_config       = false
end
