<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import type { Player } from '$parsers/types';
	import { NumberInput, TextInput } from '$ui';
	import { Heading, Label, Radio } from 'flowbite-svelte';

	let { player = $bindable() }: { player: Player } = $props();
</script>

<Heading tag="h5" class="mb-5 mt-5">{t('player')}</Heading>
<div class="flex flex-wrap gap-7">
	<div class="flex flex-col gap-2">
		<Label>{t('name')}</Label>
		<TextInput bind:value={player.name} maxLength={7} maxBytes={11} />
	</div>
	<div class="flex flex-col">
		<Label class="mb-[-10px]">{t('id')}</Label>
		<NumberInput bind:value={player.id} min={0} max={65535} />
	</div>

	<div class="flex flex-col">
		<Label class="mb-[-10px]">{t('money')}</Label>
		<NumberInput bind:value={player.money} min={0} max={999999} />
	</div>
</div>
<div class="flex flex-col gap-2 mt-3">
	<Label>{t('model')}</Label>
	<div class="flex gap-5 mt-2">
		{#each ['Chris', 'Kris', 'Crys'] as model}
			<Radio
				custom
				bind:group={player.gender}
				value={{ Chris: 'Male', Kris: 'Female', Crys: 'Non-Binary' }[model]}
			>
				<div
					class="bg-white size-fit p-2 border-1 rounded-lg border-gray-300 dark:border-gray-600 peer-checked:border-transparent peer-checked:ring-4 peer-checked:ring-purple-300"
				>
					<img
						src={`https://raw.githubusercontent.com/KohKaiSern/polishededitornew/refs/heads/main/src/gfx/trainers/${model.toLowerCase()}.png`}
						alt="Player model"
					/>
				</div>
			</Radio>
		{/each}
	</div>
</div>

<Heading tag="h5" class="mt-6 mb-5">{t('rival')}</Heading>
<div class="flex flex-wrap gap-5">
	<div class="flex flex-col gap-2">
		<Label>{t('name')}</Label>
		<TextInput bind:value={player.rivalName} maxLength={7} maxBytes={11} />
	</div>
</div>
