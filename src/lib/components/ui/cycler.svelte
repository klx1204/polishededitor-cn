<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { Button } from 'flowbite-svelte';
	import { QuestionCircleSolid, EyeSolid, CheckCircleSolid } from 'flowbite-svelte-icons';

	interface CyclerProps {
		value: number;
	}
	let { value = $bindable() }: CyclerProps = $props();

	let configs = $derived([
		{
			bg: 'bg-gray-400',
			hover: 'hover:bg-gray-300',
			icon: QuestionCircleSolid,
			label: t('unknown')
		},
		{ bg: 'bg-yellow-500', hover: 'hover:bg-yellow-400', icon: EyeSolid, label: t('seen') },
		{ bg: 'bg-green-500', hover: 'hover:bg-green-400', icon: CheckCircleSolid, label: t('caught') }
	]);

	const config = $derived(configs[value]);
</script>

<Button onclick={() => (value = (value + 1) % 3)} class="{config.bg} {config.hover} max-h-10">
	{@const Icon = config.icon}
	<Icon class="mr-2 ml-[-5px]" />
	{config.label}
</Button>
