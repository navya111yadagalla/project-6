pipeline {
    agent any
    
    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/K102eethi/cicd-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cicd-demo .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-password', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker tag cicd-demo $DOCKER_USER/cicd-demo
                    docker push $DOCKER_USER/cicd-demo
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 80:3000 $DOCKER_USER/cicd-demo'
            }
        }
    }
}
