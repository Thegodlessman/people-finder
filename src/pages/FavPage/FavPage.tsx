import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol } from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const FavPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar style={{ padding: '7px' }}>
                    <IonTitle class="ion-text-center">Favoritos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard color="light">
                                <IonCardHeader>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>Card Content</IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default FavPage;