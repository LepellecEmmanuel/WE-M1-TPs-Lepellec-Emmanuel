import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../pokemon';
import { FilterPokemonPipePipe } from '../filter-pokemon--pipe-pipe';

@Component({
  selector: 'app-my-component',
  imports: [FormsModule, FilterPokemonPipePipe],
  templateUrl: './my-component.html',
  styleUrl: './my-component.css',
})
export class MyComponent {
  id = signal('');
  pokename = computed(() => {
    for (let i = 0; i < this.pokelist.length; i++) {
      if (this.pokelist[i].id === this.id()) {
        return this.pokelist[i].name;
      }
    }
    return '';
  });

  pokelist: Pokemon[] = [
    new Pokemon('1', 'Pikatchu'),
    new Pokemon('2', 'Bulbizard'),
    new Pokemon('3', 'Mew'),
    new Pokemon('4', 'Charizard'),
    new Pokemon('5', 'Zarbi'),
  ];

  searchPokemonName = '';
  selectedPokemonId: String = '';

  go() {
    console.log(this.selectedPokemonId);
  }
}
