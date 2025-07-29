pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances
                    sh 'npm install'
                }
            }
        }
        stage('Run Development') {
            steps {
                script {
                    // Exécuter npm run dev
                    sh 'npm run dev'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Exécuter npm run build
                    sh 'npm run build'
                }
            }
        }
    }
}
