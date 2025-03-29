FROM homeassistant/home-assistant:latest

# Set environment variables
ENV TZ=UTC

WORKDIR /config
RUN chmod -R 777 /config

# Expose the default Home Assistant port
EXPOSE 8123

# Start Home Assistant
CMD ["/init"]