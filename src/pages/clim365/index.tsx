import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import CliM365Terminal from './components/clim365terminal'

const GraphSDKConsole = () => {
  return (
    <IonPage>
      <Header title={'CLI for Microsoft 365'} />
      <IonContent>
        <LoadingSpinner />
        <CliM365Terminal />
      </IonContent>
    </IonPage>
  )
}

export default GraphSDKConsole
