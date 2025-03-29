FROM homeassistant/home-assistant:latest

ENV TZ=Asia/Ho_Chi_Minh
ENV PYTHONUNBUFFERED=1

WORKDIR /homeassistant  

RUN chmod -R 777 /homeassistant
EXPOSE 8123

# Chạy Home Assistant
CMD ["/init"]

