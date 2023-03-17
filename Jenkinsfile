pipeline {
  agent any

  tools {nodejs 'nodejs-16.15.0'}

  stages {
    
    stage('Build') {
      steps {
        sh 'npm install -g pnpm'
        sh 'pnpm install'
      }
    }

    stage('Deploy') {
      steps {
        sshPublisher(
        continueOnError: false, 
        failOnError: true,
        publishers: [
            sshPublisherDesc(
            configName: 'Ansible',
            verbose : true,
            transfers: [
                sshTransfer(
                sourceFiles: 'src/, Dockerfile, package.json, pnpm-lock.yaml, Ansiblefile.yaml',
                remoteDirectory: 'docker/nodejs-pnpm-backend',
                execCommand : 'ansible-playbook -v -i /etc/ansible/hosts /home/Chakhree/docker/nodejs-pnpm-backend/Ansiblefile.yaml'
                )
            ]
            )
        ]
        )
      }
}

  }
}
