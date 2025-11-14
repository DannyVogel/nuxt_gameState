# gameState 2.0 - Project Specification

## Overview

**gameState** is a full-stack, SSR (Server-Side Rendered) game tracking application built with Nuxt 3. Users can search for games using the Twitch IGDB API, add them to personal lists (played/to-play), track game status, add comments, and view comprehensive statistics about their gaming activity.

## Technology Stack

- **Framework**: Nuxt 3 (v4.0.0)
- **Frontend**: Vue 3, Nuxt UI, Tailwind CSS
- **Backend**: Nuxt Server API (Nitro)
- **Authentication**: OAuth with Google Sign-In (nuxt-auth-utils)
- **Database**: Firebase Realtime Database
- **External APIs**: Twitch IGDB API (v4)
- **Package Manager**: Bun
- **Additional Libraries**: 
  - Epic Spinners (loading animations)
  - Iconify (icons)
  - VueUse (composables)

## Core Features

### 1. Authentication & User Management
- **Google OAuth Integration**: Users authenticate via Google Sign-In
- **Session Management**: Secure session handling with 7-day expiration
- **User Profile**: 
  - Display name management
  - User avatar from Google account
  - Email and name from OAuth provider
- **Protected Routes**: Global auth middleware protects all routes except homepage
- **User Data Storage**: User-specific game lists stored in Firebase Realtime Database

### 2. Game Search
- **IGDB API Integration**: Search games using Twitch IGDB API
- **Search Capabilities**:
  - Search by game name
  - Returns up to 50 results per query
  - Filters out DLC and expansion packs
  - Excludes specific keywords (2004, 1617, 24124)
- **Search Results Include**:
  - Game name, slug, ID
  - Genres
  - Release date
  - Platforms
  - Screenshots and artwork
  - Cover image
- **Search Page**: Dynamic route `/search/[query]` displays search results

### 3. Game Lists Management

#### 3.1 Game Status Types
- **toPlay**: Games user wants to play
- **beat**: Games user has completed
- **playing**: Games currently being played
- **dropped**: Games user stopped playing

#### 3.2 List Operations
- **Add Game**: Add games from search results to user's list
- **Remove Game**: Delete games from user's list
- **Update Game**: Refresh game data from IGDB API
- **Bulk Update**: Update multiple games at once (for "to-play" list)
- **Get Game by ID**: Retrieve specific game details

#### 3.3 List Views
- **To-Play List** (`/to-play`):
  - Sortable by release date (ASC/DESC)
  - Infinite scroll pagination
  - Grid layout (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
  - Bulk update functionality
  
- **Played List** (`/played`):
  - Grouped by year played
  - Infinite scroll pagination
  - Filtering capabilities:
    - Filter by status (beat, playing, dropped)
    - Filter by year played
    - Filter by games with/without comments
  - Grid layout (responsive)

### 4. Game Details & User Data
- **Game Information**:
  - Name, slug, ID
  - Genres (displayed as tags)
  - Release date
  - Platforms (with short name formatting)
  - Screenshots gallery (carousel)
  - Cover image
  
- **User-Specific Data**:
  - Status (toPlay, beat, playing, dropped)
  - Comments (user notes about the game)
  - Month played (1-12)
  - Year played
  
- **Game Cards**:
  - **Compact Card**: Used in list views
  - **Full Card**: Detailed view with gallery and user data editing
  - Edit/Remove/Status change buttons
  - Screenshot carousel with navigation

### 5. Statistics & Analytics (`/stats`)
- **Summary Statistics**:
  - Total games in collection
  - Completion rate (beat games / total played games)
  
- **Status Breakdown**:
  - Count of games by status (beat, playing, toPlay, dropped)
  - Visual chart representation
  
- **Genre Analysis**:
  - Genre breakdown (count per genre)
  - Top 5 most played genres
  
- **Platform Analysis**:
  - Platform breakdown (count per platform)
  - Top 5 most played platforms
  
- **Temporal Analysis**:
  - Yearly breakdown (games played per year)
  - Recent activity (last 4 months with game counts)
  
- **Visual Components**:
  - Status chart (pie/bar chart)
  - Genre breakdown visualization
  - Platform breakdown visualization
  - Activity timeline
  - Yearly breakdown chart

### 6. Filtering & Sorting
- **List Filtering**:
  - Filter by status
  - Filter by year played
  - Filter by comments (has comments / no comments)
  - Search within list (by game name)
  
- **Sorting**:
  - To-play list: Sort by release date (ASC/DESC)
  - Played list: Sort by date played (newest first)

### 7. Pagination & Infinite Scroll
- **Pagination**:
  - Page-based pagination (default: 10 items per page)
  - Configurable page size
  - Total count tracking
  
- **Infinite Scroll**:
  - Automatic loading on scroll
  - Distance threshold: 10px from bottom
  - Loading state indicators
  - "No more games" indicator

### 8. UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Color mode toggle support
- **Loading States**: Spinner animations during data fetching
- **Page Transitions**: Smooth fade/blur transitions between pages
- **Notifications**: Toast notifications system (UNotifications)
- **Icons**: Iconify integration (MDI, Phosphor icons)
- **Typography**: Custom font (Tilt Warp)

## Type Definitions

### Core Game Types

```typescript
// Base game interface from IGDB
interface Game {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string; // ISO date string or "TBA"
  imageId: string | null;
  screenshotIds: string[];
  platforms: string[];
}

// User game with personal data
interface UserGame extends Game {
  status: "toPlay" | "beat" | "dropped" | "playing";
  comments: string;
  monthPlayed: number; // 1-12
  yearPlayed: number;
}

// User data that can be updated
type GameUserData = {
  status: "toPlay" | "beat" | "dropped" | "playing";
  comments: string;
  monthPlayed: number;
  yearPlayed: number;
};
```

### API Response Types

```typescript
// Standard API response wrapper
interface NitroResponse<T> {
  statusCode: number;
  statusMessage: string;
  payload: T | null;
  message: string;
}

// Game list API response
interface GameListPayload {
  gameList: UserGame[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  counts: {
    gamesToPlay: number;
    gamesPlayed: number;
  };
}

// Game statistics
interface GameStats {
  totalGames: number;
  statusBreakdown: {
    beat: number;
    playing: number;
    toPlay: number;
    dropped: number;
  };
  genreBreakdown: {
    [genre: string]: number;
  };
  platformBreakdown: {
    [platform: string]: number;
  };
  completionRate: number; // Percentage
  yearlyBreakdown: Array<{ year: string; count: number }>;
  mostPlayedGenres: {
    genre: string;
    count: number;
  }[];
  mostPlayedPlatforms: {
    platform: string;
    count: number;
  }[];
  recentActivity: {
    monthYear: string;
    count: number;
  }[];
}
```

### Authentication Types

```typescript
// User session data
interface User {
  sub: string; // User ID
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  displayName: string;
}

interface UserSession {
  user: User;
}

interface LoginPayload {
  uid: string;
  email: string;
  username: string;
}

interface DisplayNamePayload {
  displayName: string;
}
```

### IGDB API Types

```typescript
// IGDB search response
type SearchResponse = Game[];

// IGDB game structure
interface Game {
  id: number;
  first_release_date: number; // Unix timestamp
  genres: Genre[];
  name: string;
  platforms: Platform[];
  screenshots: Screenshot[];
  artworks: Artwork[];
  slug: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Platform {
  id: number;
  name: string;
}

interface Screenshot {
  id: number;
  image_id: string;
}

interface Artwork {
  id: number;
  image_id: string;
}
```

### UI Types

```typescript
type View = "to-play" | "played" | "search-query";

interface CarouselRef {
  page: number;
  pages: number;
  select: (page: number) => void;
  next: () => void;
  prev: () => void;
}
```

### Token Management Types

```typescript
interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TokenObject {
  access_token: string;
  expiration_date: Date;
  token_type: string;
}
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth handler

### Game Lists
- `GET /api/game-list` - Get paginated game list with filters
  - Query params: `page`, `limit`, `list` (toPlay|played), `status`, `search`, `sort`, `year`, `hasComments`
- `POST /api/game-list/add` - Add game to user's list
- `DELETE /api/game-list/remove` - Remove game from list
- `GET /api/game-list/[id]` - Get specific game by ID
- `PATCH /api/game-list/[id]` - Update game(s) from IGDB (supports comma-separated IDs)
- `GET /api/game-list/stats` - Get user's game statistics
- `GET /api/game-list/fix` - Data restoration endpoint
- `POST /api/game-list/fix` - Data restoration endpoint

### Search
- `GET /api/search/[query]` - Search games via IGDB API

### User Management
- `POST /api/user/displayname` - Update user display name

### IGDB Token Management
- `GET /api/igdb/token` - Get IGDB access token
- `GET /api/igdb/validate/[token]` - Validate IGDB token

### Utilities
- `GET /api/storage` - Storage utility endpoint
- `POST /api/routes/log/errors/[name]` - Error logging endpoint

## Data Flow

### Adding a Game
1. User searches for game via `/api/search/[query]`
2. IGDB API returns game data
3. User selects game and chooses status (toPlay/beat/playing/dropped)
4. Frontend calls `POST /api/game-list/add` with game data
5. Backend stores game in Firebase Realtime Database under user's ID
6. Game appears in appropriate list view

### Updating Game Data
1. User clicks refresh/update button on game card
2. Frontend calls `PATCH /api/game-list/[id]`
3. Backend fetches latest data from IGDB API
4. Backend updates game in Firebase
5. Frontend refreshes game display

### Viewing Statistics
1. User navigates to `/stats`
2. Frontend calls `GET /api/game-list/stats`
3. Backend retrieves all user games from Firebase
4. Backend calculates statistics using `StatsController`
5. Frontend displays statistics in various chart components

## Database Structure (Firebase Realtime Database)

```
users/
  {userId}/
    games/
      {gameId}/
        id: number
        name: string
        slug: string
        genres: string[]
        released: string
        imageId: string
        screenshotIds: string[]
        platforms: string[]
        status: "toPlay" | "beat" | "dropped" | "playing"
        comments: string
        monthPlayed: number
        yearPlayed: number
    displayName: string
```

## Component Architecture

### Layout Components
- `TheHeader` - Navigation header with user menu
- `TheFooter` - Site footer
- `default.vue` - Default layout wrapper

### Authentication Components
- `Login.vue` - Login interface
- `Slideover.vue` - Auth slideover panel
- `UserMenu.vue` - User dropdown menu

### Game Components
- `Game/Card/Compact.vue` - Compact game card for lists
- `Game/Card/Full.vue` - Full game details card
- `Game/Gallery.vue` - Screenshot gallery carousel
- `Game/Filters.vue` - Filter controls for played list
- `Game/UserData.vue` - User data editing form
- `Game/Stats/` - Statistics visualization components
  - `index.vue` - Main stats container
  - `Summary.vue` - Summary statistics
  - `Status/` - Status breakdown charts
  - `Genres.vue` - Genre statistics
  - `Platforms.vue` - Platform statistics
  - `YearlyBreakdown.vue` - Yearly activity chart
  - `Activity.vue` - Recent activity timeline

### Button Components
- `Button/Edit.vue` - Edit game button
- `Button/Remove.vue` - Remove game button
- `Button/Played.vue` - Mark as played button
- `Button/ToPlay.vue` - Add to play list button
- `Button/Group.vue` - Button group container

### Search Components
- `Search/Bar.vue` - Search input component
- `Search/Result.vue` - Search result item

### Utility Components
- `Welcome.vue` - Welcome message component
- `ColorMode.vue` - Color mode toggle

## Composables

### `useGameList()`
Provides game list management functions:
- `getGamesCount()` - Get total game counts
- `getGamesToPlay(page, limit, sort)` - Get to-play list
- `getGamesPlayed(page, limit, status, year, hasComments)` - Get played list
- `addToList(game)` - Add game to list
- `removeFromList(gameID)` - Remove game from list
- `getGameById(gameId)` - Get game by ID
- `updateGameById(gameId)` - Update game from IGDB
- `updateGames(gameIds)` - Bulk update games
- `restoreData()` - Restore data from backup
- `getGameStats()` - Get game statistics

### `useSearch()`
Provides search functionality:
- `search(query)` - Search games via IGDB
- `updateGameById(gameId)` - Update game data (TODO)

## Server Controllers

### `DbController`
Firebase database operations:
- `getGameList(userId)` - Retrieve user's game list
- `addToList(userId, game)` - Add game to user's list
- `removeFromList(userId, gameId)` - Remove game from list
- `updateList(userId, game)` - Update game in list
- `addLog(logData)` - Add log entry

### `GameListController`
Game list business logic:
- `filterByList(games, list, sort)` - Filter games by list type
- `applyFilters(games, status, search, year, hasComments)` - Apply filters
- `getPaginatedResults(games, page, limit)` - Paginate results

### `StatsController`
Statistics generation:
- `generateGameStats(games)` - Calculate all statistics

### `UserController`
User management:
- `updateDisplayName(userId, displayName)` - Update user display name

## Server Services

### `tokenManagers/igdb.ts`
IGDB token management:
- `getToken()` - Get valid IGDB access token (with caching/refresh)

### `firebase.ts`
Firebase Admin SDK initialization and configuration

## Utilities

### `game.utils.ts`
Game-related utility functions:
- Platform name formatting
- Date handling
- Image URL generation

### `image.utils.ts`
Image handling utilities:
- IGDB image URL construction
- Image optimization

## Configuration

### Runtime Config
- `IGDBClientId` - Twitch IGDB Client ID
- `IGDBClientSecret` - Twitch IGDB Client Secret
- `firebaseAdminId` - Firebase Admin credentials
- `databaseURL` - Firebase Realtime Database URL
- `googleApplicationCredentials` - Google OAuth credentials
- `googleRedirectURL` - OAuth redirect URL (dev: localhost:3000)

### Session Config
- `maxAge`: 7 days (60 * 60 * 24 * 7 seconds)

## Security Features

- **Authentication Required**: All routes except homepage require authentication
- **Session Management**: Secure session handling with expiration
- **User Isolation**: Each user's data is isolated by user ID
- **Token Management**: IGDB tokens are managed server-side
- **Error Handling**: Comprehensive error handling and logging

## Future Enhancements (From README)

- Add to list error handling and toasts
- Include videos in game details
- Add user game ratings
- Add user game reviews
- Add user profile page
- Add friends and share game lists

## Development Notes

- Uses Bun as package manager
- Development server runs on `localhost:3000`
- Page transitions: fade + blur effect
- Custom font: "Tilt Warp"
- Image domains configured for IGDB and RAWG
- Compatibility date: 2024-07-06

