FROM node:22-alpine AS build
WORKDIR /workspace
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:1.29-alpine
COPY --from=build /workspace/dist/portal-examenes/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY runtime-config.template.json /opt/netec/runtime-config.template.json
COPY docker-entrypoint.sh /opt/netec/docker-entrypoint.sh
RUN chmod 0555 /opt/netec/docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/opt/netec/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
