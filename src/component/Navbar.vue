<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        modelValue: {
            type: Object,
            default: () => ({ start: '', end: '', time: ''})
        },
        startOptions: Array,
        endOptions: Array,
        timeOptions: Array,
    })

    const emit = defineEmits(['update:modelValue'])

    function updateField(field, value) {
        emit('update:modelValue', {
            ...props.modelValue,
            [field]: value,
        })
    }

</script>

<template>
    <div class="navbar">
        <label for="start">起點:</label>
        <select :value="modelValue.start" @input="updateField('start', $event.target.value)">
            <option value="">全部</option>
            <option v-for="loc in startOptions" :key="loc" :value="loc">
                {{ loc }}
            </option>
        </select>

        <label for="end">終點:</label>
        <select :value="modelValue.end" @input="updateField('end', $event.target.value)">
            <option value="">全部</option>
            <option v-for="loc in endOptions" :key="loc" :value="loc">
                {{ loc }}
            </option>
        </select>

        <label for="time">時間:</label>
        <select :value="modelValue.time" @input="updateField('time', $event.target.value)">
            <option value="">全部</option>
            <option v-for="loc in timeOptions" :key="loc" :value="loc">
                {{ loc }}
            </option>
        </select>
    </div>
</template>

<style scoped>
    .navbar {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
    }
    select {
        padding: 4px 8px;
    }
</style>