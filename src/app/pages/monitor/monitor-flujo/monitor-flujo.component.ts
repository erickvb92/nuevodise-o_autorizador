import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-monitor-flujo',
  templateUrl: './monitor-flujo.component.html',
  styleUrls: ['./monitor-flujo.component.css']
})
export class MonitorFlujoComponent implements OnInit {

 
  displayedColumns: string[] = ['id', 'title', 'body', 'userId', 'actions'];
  dataSource = new MatTableDataSource<Post>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchPosts()
    console.log('DataSource', this.dataSource)
  }

  fetchPosts(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
      this.dataSource.data = data as Post[];
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
