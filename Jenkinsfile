pipeline {
  agent any

  tools {nodejs 'nodejs-16.15.0'}

  stages {
    
    stage('Install') {
      steps {
        sh 'npm install -g pnpm'
        sh 'pnpm install'
      }
    }

    // stage('Build') {
    //   steps {
    //     sh 'pnpm build'
    //   }
    // }

    // stage('Test') {
    //   steps {
    //     sh 'pnpm test'
    //   }
    // }

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
                sourceFiles: '/config, /docs,  /middleware, /models, /routes, Ansiblefile.yaml, Dockerfile, index.ts, package.json, pnpm-lock.yaml, tsconfig.build.json, tsconfig.json',
                remoteDirectory: 'docker/expressjs-pnpm-backend',
                // execCommand : 'ansible-playbook -v -i /etc/ansible/hosts /home/Chakhree/docker/expressjs-pnpm-backend/Ansiblefile.yaml'
                )
            ]
            )
        ]
        )
      }
}

  }
}
