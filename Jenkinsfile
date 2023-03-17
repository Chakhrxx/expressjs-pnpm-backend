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
                execCommand : 'ansible-playbook --diff -vv -i /etc/ansible/hosts /home/Chakhree/docker/nodejs-pnpm-backend/Ansiblefile.yaml'
                // execCommand: 'cd /home/Chakhree/nodejs-pnpm-backend; docker rmi nodejs-pnpm-image; docker stop nodejs-pnpm-container; docker rm nodejs-pnpm-container; docker build -t nodejs-pnpm-image .; docker run -d --name nodejs-pnpm-container -p 3001:3000 nodejs-pnpm-image'
                )
            ]
            )
        ]
        )
      }
}

  }
}
