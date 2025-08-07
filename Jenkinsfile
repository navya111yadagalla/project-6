pipeline {
    agent any
 
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/your-repo.git'
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
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login -u your-dockerhub-username --password-stdin
                    docker tag cicd-demo your-dockerhub-username/cicd-demo
                    docker push your-dockerhub-username/cicd-demo
                    '''
                }
            }
        }
 
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 80:3000 your-dockerhub-username/cicd-demo'
            }
        }
    }
} 
