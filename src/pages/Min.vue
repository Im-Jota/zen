<template>
    <div class="containerMin">
        <div class="top">
            <w-settings :style="{ color: textColor }" />
        </div>
        <div class="content">
            <div class="contentTop">
                <Logo />
            </div>
            
            <div class="contentMain">
                <div class="search">
                    <Search />
                </div>

                <div class="shortcuts">
                    <Shortcuts small />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
    data() {
        return {

        }
    },
    components: {
        WSettings: defineAsyncComponent(() => import('../widgets/Setting.vue')),
        Logo: defineAsyncComponent(() => import('../widgets/Logo.vue')),
        Search: defineAsyncComponent(() => import('../widgets/Search.vue')),
        Shortcuts: defineAsyncComponent(() => import('../widgets/Marked.vue')),
    },

    mounted() {

    },
}
</script>

<style scoped>
.containerMin {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
}

.top {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: end;
    align-items: center;
}

.content {
    width: 100%;
    min-width: 400px;
    max-width: 800px;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
    gap: 3rem;
}

.contentTop {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: end;
    align-items: center;
}

.contentMain {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-width: 200px;
    max-width: 750px;
}

.contentMain > .search {
    width: 100%;
}

.contentMain > .shortcuts {
    max-width: 800px;
    display: flex;
    justify-content: start;
    align-items: start;
}
</style>