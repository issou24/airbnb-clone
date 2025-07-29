pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    if (!fileExists('airbnb-clone')) {
                        sh 'git clone https://github.com/issou24/airbnb-clone'
                    } else {
                        echo 'Le répertoire existe déjà, saut du clonage.'
                    }
                }
            }
        }
        stage('Go in Repo') {
            steps {
                script {
                    dir('airbnb-clone') {
                        sh 'ls -la'
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    dir('airbnb-clone') {
                        sh 'npm install'
                    }
                }
            }
        }
stage('Run Development') {
    steps {
        script {
            dir('airbnb-clone') {
                try {
                    timeout(time: 10, unit: 'SECONDS') {
                        sh 'npm run dev'
                    }
                } catch (Exception e) {
                    echo 'Le processus npm run dev a dépassé le délai imparti, mais le pipeline continue.'
                }
            }
        }
    }
}
stage('Run build') {
    steps {
        script {
            dir('airbnb-clone') {
                try {
                    timeout(time: 10, unit: 'SECONDS') {
                        sh 'npm run build'
                    }
                } catch (Exception e) {
                    echo 'Le processus npm run dev a dépassé le délai imparti, mais le pipeline continue.'
                }
            }
        }
    }
}
    }
}
