pipeline {
    agent any

    stages {

        stage('Code') {
            steps {
                
                
                   git branch: 'main', url: 'https://github.com/adityaghaywat-cmd/sample-react.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    rm -rf /var/www/html/react1/*
                    cp -r dist/* /var/www/html/react1/
                    sudo nginx -t
                    sudo systemctl reload nginx
                '''
            }
        }
    }
}

----------------

[root@localhost conf.d]# pwd
/etc/nginx/conf.d
[root@localhost conf.d]# cat vpcollege.conf 
server {
    listen 80;
    listen [::]:80;

    server_name react1.local;

    root /var/www/html/react1/;
    index index.html index.htm;

    include /etc/nginx/default.d/*.conf;

    error_page 404 /404.html;
    location = /404.html {
    }

    error_page 500 502 503 504 /50x.html;
}


                      
