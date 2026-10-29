<script lang="ts">
	import { Button, Dropdown, Search } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	interface ComboboxProps {
		value: string;
		options: string[];
		onchange?: () => void;
		class?: string;
		labelFn?: (value: string) => string;
		subFn?: (value: string) => string | undefined;
	}

	let {
		value = $bindable(),
		options,
		onchange = () => {},
		class: className = '',
		labelFn = (value: string) => value,
		subFn
	}: ComboboxProps = $props();

	let searchTerm = $state('');
	let isOpen = $state(false);
	const filteredOptions = $derived(
		options.filter((o: string) => {
			const q = searchTerm.toLowerCase();
			return o.toLowerCase().includes(q) || labelFn(o).toLowerCase().includes(q);
		})
	);
	let selectedLabel = $derived(labelFn(value));
	let selectedSub = $derived(subFn?.(value));
</script>

<div class="flex align-middle">
	<div>
		<Button
			class="h-full bg-purple-600 dark:bg-purple-500 {className} focus:ring-4 ring-purple-300"
		>
			<span class="inline-flex flex-col items-start leading-tight">
				<span>{selectedLabel}</span>
				{#if selectedSub && selectedSub !== selectedLabel}
					<span class="text-[10px] font-normal text-purple-100/80">{selectedSub}</span>
				{/if}
			</span>
			<ChevronDownOutline class="ms-3 h-5 w-5" />
		</Button>
	</div>
	<Dropdown bind:isOpen class="w-65">
		<div class="p-3">
			<Search bind:value={searchTerm} size="md" />
		</div>
		<div class="max-h-60 overflow-y-auto">
			{#each filteredOptions as option}
				{@const label = labelFn(option)}
				{@const sub = subFn?.(option)}
				<Button
					color="dark"
					outline
					class="border-0 w-full rounded-none justify-start px-4 py-3 text-black dark:text-white"
					onclick={() => {
						value = option;
						searchTerm = '';
						isOpen = false;
						onchange?.();
					}}
				>
					<span class="inline-flex flex-col items-start leading-tight">
						<span>{label}</span>
						{#if sub && sub !== label}
							<span class="text-[10px] font-normal text-gray-500 dark:text-gray-400">{sub}</span>
						{/if}
					</span>
				</Button>
			{/each}
		</div>
	</Dropdown>
</div>
