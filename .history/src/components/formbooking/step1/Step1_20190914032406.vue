<template>
<v-stepper-content step="1">
                    <step-1 @updateStep="step = $event" :booking="booking"/>
                </v-stepper-content>
</template>