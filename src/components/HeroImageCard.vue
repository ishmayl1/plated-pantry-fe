<template>
    <v-card rounded="xl" elevation="4">
        <v-img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e433a9a06f-68a9b95ea72f6830873e.png"
            height="320"
            cover
        />
        <v-card-title class="d-flex align-center justify-space-between">
            <span class="text-h6 font-weight-bold"
                >Garlic Butter Shrimp Pasta</span
            >
            <v-chip
                color="#e4fcec"
                text-color="#49b583"
                class="font-weight-bold"
                >35 mins</v-chip
            >
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="4" class="text-center">
                    <v-icon color="#ff6b6b" size="24">mdi-fire</v-icon>
                    <div class="text-caption">Calories</div>
                    <div class="font-weight-bold">580 kcal</div>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-icon color="#49b583" size="24">mdi-account-group</v-icon>
                    <div class="text-caption">Servings</div>
                    <div class="font-weight-bold">4 people</div>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-icon color="#ffd166" size="24">mdi-speedometer</v-icon>
                    <div class="text-caption">Difficulty</div>
                    <div class="font-weight-bold">Easy</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
// No script needed for static hero image card
</script>
