<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import type { Pokedex } from '$parsers/types';
	import { Button } from 'flowbite-svelte';
	import { QuestionCircleSolid, EyeSolid, CheckCircleSolid } from 'flowbite-svelte-icons';

	interface FullCyclerProps {
		pokedex: Pokedex;
	}
	let { pokedex = $bindable() }: FullCyclerProps = $props();

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

	let currentValue = $state(0);
	const config = $derived(configs[currentValue]);

	function cycle(): void {
		const nextValue = (currentValue + 1) % 3;
		for (const key in pokedex) {
			pokedex[key] = nextValue;
		}
		currentValue = nextValue;
	}
</script>

<Button onclick={cycle} class="{config.bg} {config.hover} max-h-10">
	{@const Icon = config.icon}
	<Icon class="mr-2 ml-[-5px]" />
	{config.label}
</Button>
