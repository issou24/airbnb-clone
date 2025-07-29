pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Vérifier si le répertoire existe
                    if (!fileExists('airbnb-clone')) {
                        // Cloner le dépôt si le répertoire n'existe pas
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
                    // Changer de répertoire pour aller dans le dépôt cloné
                    dir('airbnb-clone') {
                        // Lister les fichiers pour vérifier la présence de package.json
                        sh 'ls -la'
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances dans le répertoire du dépôt
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
                    // Exécuter npm run dev avec un timeout de 10 secondes
                    timeout(time: 10, unit: 'SECONDS') {
                        sh 'npm run dev'
                    }
                } catch (Exception e) {
                    // Gérer le timeout sans échouer le pipeline
                    echo 'Le processus npm run dev a dépassé le délai imparti, mais le pipeline continue.'
                }
            }
        }
    }
}
    }
}
