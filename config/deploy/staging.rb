application = ENV['app'] || "pic-frontend"
server = ENV['server_app'] || "root@192.168.224.146"
set :application, application
set :stage, :staging
set :branch, :staging
role :app, server
set :deploy_to, "/react_apps/#{fetch(:application)}"
