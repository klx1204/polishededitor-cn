<script lang="ts">
	import items from '$data/items.json';
	import locations from '$data/locations.json';
	import { dn, i18n, t } from '$lib/i18n.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Combobox, NumberInput, RadioSelect, TextInput } from '$ui';
	import { Heading, Label } from 'flowbite-svelte';

	let { mon = $bindable(), PF }: { mon: PartyMon | BoxMon; PF: 'polished' | 'faithful' } = $props();
	let otBytes = $derived('currentHP' in mon ? 11 : 7);
</script>

<Heading tag="h5" class="mb-5">{t('originalTrainer')}</Heading>
<div class="flex gap-5">
	<div class="flex flex-col gap-2">
		<Label>{t('nickname')}</Label>
		<TextInput bind:value={mon.OTNickname} maxLength={7} maxBytes={otBytes} />
	</div>
	<div class="flex flex-col">
		<Label class="mb-[-10px]">{t('id')}</Label>
		<NumberInput bind:value={mon.OTID} min={0} max={65535} />
	</div>
</div>

<Heading tag="h5" class="mt-5 mb-5">{t('caughtData')}</Heading>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 mb-5">
	<div class="flex flex-col gap-2">
		<Label>{t('timeOfDay')}</Label>
		<RadioSelect
			bind:value={mon.caughtTime}
			options={[
				{ text: t('day'), id: 'Day' },
				{ text: t('night'), id: 'Night' },
				{ text: t('morning'), id: 'Morning' },
				{ text: t('evening'), id: 'Evening' }
			]}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<Label>{t('ball')}</Label>
		<Combobox
			bind:value={mon.caughtBall}
			options={['Park Ball', ...items[PF].filter((i) => i.category === 'BALL').map((i) => i.name)]}
			labelFn={(v) => dn('item', v, PF)}
			subFn={(v) => (i18n.lang === 'zh' ? v : undefined)}
		/>
	</div>
	<div class="flex flex-col">
		<Label class="mb-[-10px]">{t('level')}</Label>
		<NumberInput bind:value={mon.caughtLevel} min={1} max={100} />
	</div>
	<div class="flex flex-col gap-2">
		<Label>{t('location')}</Label>
		<Combobox
			bind:value={mon.caughtLocation}
			options={locations[PF].map((l) => l.name)}
			labelFn={(v) => dn('location', v, PF)}
			subFn={(v) => (i18n.lang === 'zh' ? v : undefined)}
		/>
	</div>
</div>
