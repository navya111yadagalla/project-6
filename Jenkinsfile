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
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login -u Ke102erthi --password-stdin
                    docker tag cicd-demo Ke102erthi/cicd-demo
                    docker push Ke102erthi/cicd-demo
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 80:3000 Ke102erthi/cicd-demo'
            }
        }
    }
}
