pipeline {
    agent any
 
    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }
 
    environment {
        IMAGE_NAME = 'cicd-demo'
        DOCKER_USER = 'navya111yadagalla'
        CONTAINER_PORT = '3000'
        HOST_PORT = '80'
    }
 
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/navya111yadagalla/project-6.git'
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
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
 
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-password', usernameVariable: 'DOCKER_USER_SECRET', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u navya111yadagalla --password-stdin
                    docker tag cicd-demo navya111yadagalla/cicd-demo
                    docker push navya111yadagalla/cicd-demo
                    '''
                }
            }
        }
 
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-password', usernameVariable: 'DOCKER_USER_SECRET', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u navya111yadagalla --password-stdin
 
                    # Stop any container using port 80
                    CONTAINER_ID=$(docker ps --filter "publish=80" --format "{{.ID}}")
                    if [ ! -z "$CONTAINER_ID" ]; then
                        docker stop $CONTAINER_ID
                    fi
 
                    docker pull navya111yadagalla/cicd-demo
                    docker run -d -p 80:3000 navya111yadagalla/cicd-demo
                    '''
                }
            }
        }
    }
}
