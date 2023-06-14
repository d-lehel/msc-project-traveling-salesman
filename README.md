# Traveling Salesman

This project is an implementation of the Traveling Salesman Problem using various algorithms, including the Nearest Neighbour and 2-opt algorithms. The goal of the project is to find the shortest possible route that a salesman can take to visit a given set of cities and return to the starting point.

![image](https://github.com/d-lehel/msc-project-traveling-salesman/assets/75861915/b7b146f4-ff70-4bdd-a103-1f0da339905c)

## Algorithms Used
- **Nearest Neighbour**: This algorithm starts with an arbitrary city and repeatedly selects the nearest unvisited city until all cities are visited. It provides a quick but suboptimal solution.
- **2-opt**: This algorithm optimizes the initial solution obtained from the Nearest Neighbour algorithm. It iteratively swaps pairs of edges to improve the route until no further improvements can be made. It often produces better solutions but requires more computation.

## Visualisation
The project utilizes the **p5.js** library for visualizing the traveling salesman problem. **p5.js** is a JavaScript library that simplifies the creation of interactive graphics and animations on the web. It provides a straightforward and intuitive way to display the cities, routes, and the optimization process.

## Styling
This project incorporates the Bootstrap CSS framework for styling.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/traveling-salesman.git
   ```
2. Open the project directory:
   ```
   cd traveling-salesman
   ```
3. Launch the application in a web browser.

Feel free to contribute to the project by implementing additional algorithms, improving the visualizations, or enhancing the user interface.

## Resources
- [p5.js](https://p5js.org/) - Official p5.js website
- [Bootstrap](https://getbootstrap.com/) - Official Bootstrap website
- [Traveling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) - Wikipedia article on the Traveling Salesman Problem
